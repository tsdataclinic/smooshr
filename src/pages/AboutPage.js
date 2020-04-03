import React from "react";

export default function AboutPage() {
    return (
        <div className="about-page">
            <section>
                <h2>What is smooshr?</h2>
                <p>
                    Introducing smooshr, a quick and friendly way to clean messy
                    datasets.
                </p>

                <p>
                    Datasets can be messy and as data scientists, data
                    journalists, civic technologists or just the curious people,
                    we spend a lot of our time trying to clean it up. That's why
                    we built smooshr, a browser based tool that aids you in
                    producing code that can quickly clean up unruly datasets.
                </p>

                <p>
                    Our first release focuses on entity consolidation tasks but
                    we have plans to extend this to other forms of data cleaning
                    in the near future.
                </p>
            </section>
            <section>
                <h2>What is Data Clinic?</h2>
                <p>
                    As the data and tech philanthropic arm of Two Sigma, Data
                    Clinic provides pro bono data science and engineering
                    support to nonprofits and engages in open source tooling and
                    research that contribute to the Data for Good movement.
                </p>

                <p>
                    We leverage Two Sigma’s people, data science skills, and
                    technological know-how to support communities, mission
                    driven organizations, and the broader public in their effort
                    to use data more effectively.
                </p>

                <p>
                    To learn more visit{" "}
                    <a href="dataclinic.twosigma.com">
                        dataclinic.twosigma.com
                    </a>{" "}
                    and connect with us via{" "}
                    <a href="mailto:dataclinic@twosigma.com">
                        dataclinic@twosigma.com
                    </a>
                    .
                </p>
            </section>

            <section>
                <h2>How can I get involved?</h2>
                <p>
                    smooshr is an open source project which means anyone can
                    help make it better. To log bugs, suggest features or to
                    directly help improve the code, head over to our github page
                    at{" "}
                    <a href="https://github.com/tsdataclinic/smooshr/">
                        github.com/tsdataclinic/smooshr
                    </a>
                </p>

                <p>
                    We leverage Two Sigma’s people, data science skills, and
                    technological know-how to support communities, mission
                    driven organizations, and the broader public in their effort
                    to use data more effectively.
                </p>

                <p>
                    To learn more visit{" "}
                    <a href="dataclinic.twosigma.com">
                        dataclinic.twosigma.com
                    </a>{" "}
                    and connect with us via{" "}
                    <a href="mailto:dataclinic@twosigma.com">
                        dataclinic@twosigma.com
                    </a>
                    .
                </p>
            </section>
        </div>
    );
}
