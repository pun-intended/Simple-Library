import React, {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom"
import UserContext from "../UserContext";
import JobCard from "./JobCard.js";
import JoblyApi from "../api.js"

function JobList() {
    const params = useParams()
    const [jobs, setJobs] = useState([])

    const currentUser = useContext(UserContext)
    const [userJobs, setUserJobs] = useState([])

    useEffect(() => {
        async function initializeJobs() {
            const allJobs = params.handle ? 
            await JoblyApi.getCompanyJobs(params.handle) : 
            await JoblyApi.getAllJobs();
            setJobs(allJobs)
        }
        
        initializeJobs()
    }, [])

    useEffect(() => {
        async function getUserJobs() {
            const jobs = (currentUser.applications)
            setUserJobs([...jobs])
            console.log(jobs)
        }
        getUserJobs()
    }, [])

    async function search(queryString) {
        const result = await JoblyApi.getJobs(queryString)
        setJobs([...result])
    }

    async function apply(id) {
        try{
            await JoblyApi.applyForJob(currentUser.username, id)
            setUserJobs([...userJobs, id])
        } catch (e) {
            console.log(e)
        }
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
                        <JobCard job={job} disabled={userJobs.includes(job.id)} apply={apply}/>
                    )
                })}
            </div>
        </div>
    )
}

export default JobList;