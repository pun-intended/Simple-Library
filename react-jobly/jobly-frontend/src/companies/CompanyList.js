import React from "react";

function CompanyList(companies) {
    return(
        <div className="CompanyList">
            {/* <search bar> */}
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

export default CompanyDetails;