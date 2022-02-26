//// Subsection.js - component for the 4 subsections below Banner.js

const Subsection = ({ header, body, imgSrc }) => {

    // Image styling
    const imgStyle = {
        width: '75%',
        height: '100%'
    }

    return (
        <section>
            <div className='subsectionWrapper'>
                <div className='subsectionContent'>
                    <h2>{header}</h2>
                    <h4>{body}</h4>
                </div>

                <div>
                    <img src={imgSrc} alt='Placeholder' style={imgStyle}/>
                </div>
            </div>
        </section>
    )
}

export default Subsection;