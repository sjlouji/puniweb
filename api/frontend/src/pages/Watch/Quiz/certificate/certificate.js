import React, { Component } from 'react'

export default class Certificate extends Component {
    render() {
        return (
            <div>
               <section className="master-certificate-container">
<div className="master-certificate-banner"></div>
    <div className="master-certificate-position">
            <img src="https://storage.googleapis.com/sproboticworks/master/assets/images/marketing/logo/white-maker-lab-logo.png"/>
        <div className="master-content-container">
            <div className="title">
                MASTER <br />
                CERTIFICATE
            </div>
        </div>
    </div>
</section>
<section className="student-certificate-body master-certificate-body">
<div className="container">
    <div className="row">
        <div className="col-12">
            <div className="master-body-title">
            PRESENTED TO
            </div>
            <div className="master-body-name-border">
                <div className="master-body-name"  style="text-transform: uppercase;">
                    Joan  Louji
                </div>
            </div>
            <div className="master-dob">
                <span>DOB:</span> 10/04/2020
            </div>
                <div className="master-body-desc">
                    for the exceptional performance that has led to the successful completion of Certificate in St. Joshep Course
                    at SP ROBOTICS MAKER LAB, , chennai on 10.
                    for the exceptional performance that has led to the successful completion of St.joshep Course
                </div>
        </div>
    </div>
</div>
</section>
<div className="container footer-certificate-container"  style="margin-top: 20px;width: 100%;max-width: 100%;">
<div className="footer-certificate-details"  style="width: 28%;float: left;font-size:20px;padding-left: 29px;margin-right: 30px;">
    <div className="skill-title" style="width:70%">
        SKILL SCORE
    </div>
            <div className="col-6" style="width: 46%;float: left;margin-bottom: 15px;margin-right: 15px;">                            
                <span style="margin-top: 5px;display: inline-block;font-weight: bold;margin-bottom: 6px;font-size: 15px;">
                   100
                </span>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style="width: {{$total_percentage}}%;background-color: {{$skill['color']}};" aria-valuenow="{{$skill['earned_points']}}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
</div>
<div style="padding-left: 14px;float: left;text-align: center;margin-bottom: 20px;margin-top:5px;">
        <img src="https://storage.googleapis.com/sproboticworks/master/assets/images/certificate/stem-certificate-logo.png"  style="width: 90px;"/>
    </div>
<div className="completion-auth-sign" style="float: right;text-align: center;padding-right:60px;margin-top:25px">
    <img src="https://storage.googleapis.com/sproboticworks/master/assets/images/certificate/sneha-sign-update.png"/>
    <div>
        SNEHA PRIYA, DIRECTOR
    </div>
</div>
</div>
            </div>
        )
    }
}
