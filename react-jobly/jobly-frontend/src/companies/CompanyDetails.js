import React from "react";

function CompanyDetails(company, companyJobs) {
    return(
        <div className="CompanyDetails">
            <h2>{`${company.name}`}</h2>
            <h4>{`${company.description}`}</h4>
            <div className="CompanyDetails job-list">
                {companyJobs.map((job) => {
                    return( 
                        <JobCard job={job} />
                    )
                })}
            </div>
        </div>
    )
}

export default CompanyDetails;