import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import JobCard from "./JobCard.js";
import JoblyApi from "../api.js"

function JobList() {
    const params = useParams()
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        async function initializeJobs() {
            const allJobs = params.handle ? 
            await JoblyApi.getCompanyJobs(params.handle) : 
            await JoblyApi.getAllJobs();
            setJobs(allJobs)
            console.log("SETTING JOBS")
        }
        
        initializeJobs()
    }, [])

    async function search(queryString) {
        const result = await JoblyApi.getJobs(queryString)
        setJobs([...result])
    }
    return(
        <div className="JobList">
            // TODO add UUID to each element
            {/* <search bar> 
                add state for company list
                add state for filter
                include component? how to pass information to company list page?
                search bar value filters company list, sets filter state
                create const of array.filter() items, use that in companies.map()
            */}

           
            <div>
                <form onSubmit={search}>
                    <input type="text" className="search-bar" placeholder="Search"></input>
                    <button className="submit">Search</button>
                </form>
            </div>
            

            <div className="JobList companies">
                {jobs.map((job) => {
                    return(
                        // <h1>{`${job.title}`}</h1> 
                        <JobCard job={job} />
                    )
                })}
            </div>
        </div>
    )
}

export default JobList;