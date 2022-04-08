//// Subsection.js - component for the 4 subsections below Banner.js

import { useState, useEffect } from 'react';

const Subsection = ({ header, body, imgSrc, order }) => {
    const [switchElements, setSwitchElements] = useState(false);

    // switch places of image & text in subsections when Width >= 950px
    const switchOnResize = () => {
        let isLandscape = false;

        if (order === 2 && window.innerWidth >= 950) {
            isLandscape = true;
        }

        setSwitchElements(isLandscape);
    }

    useEffect(() => {
        switchOnResize()
        window.addEventListener('resize', switchOnResize)

        return () => {
            window.removeEventListener('resize', switchOnResize)
        }
    });

    return (
        <section>
            <div className='subsectionWrapper'>
                {/* Display image & text in different order depending on value of switchElements */}
                {switchElements ?
                    <>
                        <div>
                            <img src={imgSrc} alt='Placeholder'/>
                        </div>
                        <div className='subsectionContent'>
                            <h2 style={{ marginLeft: "65px" }}>{header}</h2>
                            <h4 style={{ marginLeft: "65px" }}>{body}</h4>
                        </div>
                    </>
                    :
                    <>
                        <div className='subsectionContent'>
                            <h2>{header}</h2>
                            <h4>{body}</h4>
                        </div>
                        <div>
                            <img src={imgSrc} alt='Placeholder' />
                        </div>
                    </>
                }
            </div>
        </section>
    )
}

export default Subsection;
