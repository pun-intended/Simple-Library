import React, {useState, useEffect} from "react";
import CompanyCard from "./CompanyCard.js";
import JoblyApi from "../api.js"

function CompanyList() {
    
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        async function initializeCompanies() {
            const allCompanies = await JoblyApi.getAllCompanies()
            setCompanies(allCompanies)
        }
        initializeCompanies()
    }, [])


    async function search(queryString) {
        const result = await JoblyApi.getCompany(queryString)
        setCompanies(result)
    }
    return(
        // TODO add UUID to each element
        <div className="CompanyList">
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
            

            <div className="CompanyList companies">
                {companies.map((company) => {
                    return( 
                        <CompanyCard company={company} />
                    )
                })}
            </div>
        </div>
    )
}

export default CompanyList;