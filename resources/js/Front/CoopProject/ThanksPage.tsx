import React from "react";

import route from "ziggy-js";

const ThanksPage: React.FC = () => {
    return (
        <>
            <header>
                <h2>Thank you for submitting a Cooperation Project</h2>
            </header>
            <main>
                <p>
                    As soon as we have validated it, the information will be
                    visible on the EI website in the{" "}
                    <a href={route("coop_projects.overview")}>
                        Resources / Cooperation Projects section
                    </a>
                    .
                </p>
                <p>
                    If you have any questions, you can write to us at{" "}
                    <a href="mailto:Solidarity@ei-ie.org">
                        Solidarity@ei-ie.org
                    </a>
                    .
                </p>
                <p>
                    If you want to submit another project you can fill out{" "}
                    <a href={route("coop_projects.create")}>the form</a> again.
                </p>
            </main>
        </>
    );
};

export default ThanksPage;
