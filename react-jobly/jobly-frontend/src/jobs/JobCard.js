import React from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

function JobCard(job) {
    return(
        <Card >
            <CardBody >
                <CardTitle>{`${job.title}`}</CardTitle>
                <CardText>
                    {`${job.company}`}<br/><br/>
                    {`Salary: ${job.salary}`}<br/>
                    {`Equity ${job.equity}`}<br/>
                    
                    <Button className="apply">Apply</Button>=
                </CardText>
            </CardBody>
        </Card>
    )
}

export default JobCard;