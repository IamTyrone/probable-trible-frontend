import React, { useState, useEffect } from "react";
import  WebsiteOverview from "./WebsitesOverview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import axios from "axios";
import ViewQuestionaire from "./ViewQuestionaire";

axios.defaults.withCredentials = true;

interface DataProps {
  data: {
    // questionaires: any;
    company: string;
    total_number_of_websites: number;
    suggestions: number;
    total_number_of_companies: number;
    total_number_of_users: number;
    new_websites_this_month: number;
    total_number_of_websites_last_month: number;
  };
}

export default function Websites({data} : DataProps){
    const [questionaires, setQuestionaires] = useState([]);

    const token = localStorage.getItem('access_token');
    const accessToken = token !== null ? JSON.parse(token) : null;

    const viewQuestionaire = (record : any) => {
        return(
            <>
                <ViewQuestionaire data={record} />
            </>
        )
    }

    useEffect(() => {
        axios
        .get(
          `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_VERSION}questionaires`,
          {
            headers: {
              'Authorization': `JWT ${accessToken}`,
              'Content-Type': 'application/json',
              'accept': 'application/json'
            }
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setQuestionaires(res.data);
          }
        })
        .catch((err) => {
          console.log(err)
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    // let percentIncrease: number = ( data.new_websites_this_month / data.total_number_of_websites_last_month ) * 100;
    // let test : number = 0;

    return(
        <>
            <div className="row my-4">
                <div className="col-lg-8 col-md-6 mb-md-0 mb-4">
                    <div className="card">
                        <div className="card-header pb-0">
                            <div className="row">
                                <div className="col-lg-6 col-7">
                                    <h6>Questionaires</h6>
                                    <p className="text-sm mb-0">
                                        {/* {{ percentIncrease === test ? 
                                            <i className="pi pi-minus text-info"></i> :
                                            <i className="pi pi-arrow-up text-info"></i>
                                        }} */}
                                        
                                        <span className="font-weight-bold ms-1">{data.new_websites_this_month}</span> websites this month
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <DataTable
                                value={questionaires}
                                filterDisplay="row"
                                className="text-danger"
                                style={{ fontSize: "12px" }}
                                responsiveLayout="scroll"
                                dataKey="id"
                                paginator
                                size="small"
                                rows={15}
                                >
                                <Column
                                    field=""
                                />
                                <Column 
                                    field="created"
                                    header="Day of survey"
                                />
                                <Column
                                    header="View"
                                    body={viewQuestionaire}
                                />
                            </DataTable>
                        </div>
                    </div>
                </div>
                <WebsiteOverview data={data}/>
            </div>
        </>
    )
}
