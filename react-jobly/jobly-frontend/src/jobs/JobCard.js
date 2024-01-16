import React from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

function JobCard({job, disabled, apply}) {

    function handleClick() {
        apply(job.id)
        console.log(`applying for ${job.id}`)
    }
    return(
        <Card >
            <CardBody >
                <CardTitle>{`${job.title}`}</CardTitle>
                <CardText>
                    {`${job.companyName}`}<br/><br/>
                    {`Salary: ${job.salary}`}<br/>
                    {`Equity ${job.equity}`}<br/>
                    <Button className="apply" disabled={disabled} onClick={handleClick}>Apply</Button>
                </CardText>
            </CardBody>
        </Card>
    )
}

export default JobCard;