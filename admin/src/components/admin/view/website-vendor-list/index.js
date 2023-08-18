import React, { useEffect, useState } from 'react';
import {
    Button
} from "@material-ui/core";
import GetNewVendorList from '../../../services/GetSupplierDetails';

const Websitesellar = () => {
    const [list, setData] = useState();

    useEffect(async() => {
        let list = await GetNewVendorList.getNewVendorList();
        if(list){
            setData(list)
        }
    }, [])
    return (
        <div className="container-fluid">
               <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">New Vendor List</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                    <li className="breadcrumb-item active">New Vendor List</li>
                </ol>
                <div className="row justify-content-between">
                    
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="card-title-2">
                                <h4>New Vendor List</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                <th style={{ width: 60 }}>ID</th>
                                                <th>Name</th>
                                                <th>Phone </th>
                                                <th>Email</th>
                                                <th>Message</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { list === undefined? <p>No data</p>:
                                                list.data.map((row, index) => (
                                                    <tr key={index}>
                                                        <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={7} /></td>
                                                        <td>{++index}</td>
                                                        <td>{row.FULLNAME}</td>
                                                        <td>{row.PHONENO}</td>
                                                        <td>{row.EMAIL}</td>
                                                        <td>{row.MESSAGE}</td>
                                                    </tr>   
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


    );
};

export default Websitesellar;