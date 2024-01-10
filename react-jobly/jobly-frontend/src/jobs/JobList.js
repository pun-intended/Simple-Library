import React, {useState} from "react";
import {useParams} from "react-router-dom"
import JobCard from "./JobCard.js";
import JoblyApi from "../api.js"

function JobList() {
    const params = useParams()
    
    const allJobs = params.handle ? JoblyApi.getCompanyJobs(params.handle) : JoblyApi.getJobs();

    

    const [jobs, setJobs] = useState(allJobs)

    async function search(queryString) {
        const result = await JoblyApi.getJobs(queryString)
        setJobs(result)
    }
    return(
        <div className="JobList">
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
                        <JobCard job={job} />
                    )
                })}
            </div>
        </div>
    )
}

export default JobList;