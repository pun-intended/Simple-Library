import React, {useState, useEffect} from "react";
import CompanyCard from "./CompanyCard.js";
import JoblyApi from "../api.js"

function CompanyList() {
    
    const [companies, setCompanies] = useState([])
    const [query, setQuery] = useState([])

    useEffect(() => {
        async function initializeCompanies() {
            const allCompanies = await JoblyApi.getAllCompanies()
            setCompanies(allCompanies)
        }
        initializeCompanies()
    }, [])


    const handleChange = (evt) => {
        const {name, value} = evt.target
        setQuery(value)
    }
    const handleSearch = async (evt) => {
        evt.preventDefault()
        const result = await JoblyApi.getCompany(query)
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
                <form onSubmit={handleSearch}>
                    <input 
                    id = "searchTerm" 
                    type="text" 
                    className="search-bar" 
                    placeholder="Search"
                    onChange={handleChange}></input>
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