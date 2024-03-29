import React from "react";
import QuestionRatings from "./QuestionRatings";

export default function UserChart(){
    return(
        <>
            <div className="col-lg-7">
                <div className="card z-index-2">
                    <div className="card-header pb-0">
                        <h6>Users overview</h6>
                    </div>
                    <div className="card-body p-3">
                        <div className="chart">
                            <QuestionRatings />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}