//// Subsection.js - component for the 4 subsections below Banner.js

const Subsection = ({ header, body }) => {
    return (
        <section>
            <div className='subsectionWrapper'>
                <div className='subsectionContent'>
                    <h2>{header}</h2>
                    <h4>{body}</h4>
                </div>

                <div>
                    <p>[image placeholder text]</p>
                </div>
            </div>
        </section>
    )
}

export default Subsection;