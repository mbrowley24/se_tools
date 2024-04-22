import React from "react";
import Header from "../header/Header";
import "../../css/about.css";



function About() {

    return(
        <>
            <Header/>
            <div class="outer-wrapper">
                <div class="inner-wrapper">
                    <div class="img_div">
                        <img src={'https://seconnerimages.nyc3.cdn.digitaloceanspaces.com/2ndHeadShot.JPG'} alt="Michael Browley" width="200" height="200"/> 
                    </div>
                    <section>
                        <h5>Who I am</h5>
                        <p class="paragragh">
                            Greetings! I'm Michael Browley, an Sales Engineer known for infusing a touch of fun into every project I tackle.
                            With a passion for innovation and a penchant for creativity, I'm excited to share my latest endeavor with you:
                            an engaging web application designed to revolutionize the way Sales Engineers collaborate on discovery questions.
                        </p>
                    </section>
                    <section>
                        <p class="paragragh">
                            My journey in the telecommunications industry has been both exhilarating and rewarding. Over the years,
                            I've had the privilege of working with diverse clients across various sectors, gaining invaluable insights
                            into their unique needs and aspirations. Through collaborative partnerships and innovative thinking,
                            I've helped organizations harness the power of technology to achieve their objectives and stay ahead in 
                            an ever-evolving market landscape.
                        </p>
                    </section>
                    <section>
                        <p class="paragragh">
                            As a Sales Engineer, I recognize the importance of continuous learning and collaboration in delivering exceptional value to clients.
                            That's why I'm excited to introduce you to my latest project: a groundbreaking web application designed to revolutionize the way Sales Engineers develop,
                            collaborate, share, and compare discovery questions with friends and colleagues.
                        </p>
                    </section>
                    <section>
                        <p class="paragragh">
                            This innovative platform empowers professionals like myself to streamline the process of developing insightful discovery questions, enabling seamless collaboration
                            and knowledge sharing with peers. With features that allow users to compare and refine questions based on real-world feedback and best practices, the application is
                            poised to become an invaluable tool for Sales Engineers seeking to elevate their customer interactions to new heights.
                        </p>
                    </section>
                    <section>
                        <p class="paragragh">
                            Join me on this exciting journey as we push the boundaries of what's possible in the telecommunications industry.
                            Together, let's harness the power of technology to drive innovation, foster collaboration, and create lasting impact in the world of sales engineering.
                            But that's just the beginning. With ambitious plans to continuously enhance and expand the platform, I'm committed to building new features that will further empower Sales Engineers in their quest to deliver exceptional customer experiences.
                            From advanced analytics and reporting capabilities to integrations with existing CRM systems, the possibilities are endless.
                            I invite you to be a part of this transformative journey, and I look forward to collaborating with you to shape the future of customer engagement in telecommunications.
                        </p>
                    </section>
                    <section>
                        <p class="paragragh">
                            So, if you're eager to elevate your sales engineering journey with a touch of excitement, I invite you to join me as we embark on this innovative project. Together, we'll explore new horizons, refine our strategies, and make meaningful connections—all while having a bit of fun along the way.
                            
                        </p>
                    </section>
                    <div class="regards">
                        <p class="">
                            Best regards,

                            Michael Browley
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;