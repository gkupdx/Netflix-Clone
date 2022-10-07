//// PlanFormAlt.js - alternate version of PlanForm.js

const PlanFormAlt = ({ checkMarkSm, activePlan, setActivePlan }) => {

    const planHeader = {
        width: '85%',
        fontSize: '0.95rem',
        fontWeight: '500',
        textAlign: 'left',
        marginTop: '20px',
        marginLeft: '10px'
    }

    return (
        <>
            <div className='planBreakdownGrid'>
                {/* GRID ROW 1 */}
                <div style={{ gridRow: '1', gridColumn: '2' }}>
                    <button onClick={() => setActivePlan('basic')} className={activePlan === 'basic' ? 'activeBtn' : 'inactiveBtn'}>Basic</button>
                </div>
                <div style={{ gridRow: '1', gridColumn: '3' }}>
                    <button onClick={() => setActivePlan('std')} className={activePlan === 'std' ? 'activeBtn' : 'inactiveBtn'}>Standard</button>
                </div>
                <div style={{ gridRow: '1', gridColumn: '4' }}>
                    <button onClick={() => setActivePlan('premo')} className={activePlan === 'premo' ? 'activeBtn' : 'inactiveBtn'}>Premium</button>
                </div>

                {/* GRID ROW 2 */}
                <div style={{ gridRow: '2', gridColumn: '1', borderBottom: '1px solid lightgrey' }}>
                    <p style={planHeader}>Monthly price</p>
                </div>
                <div style={{ gridRow: '2', gridColumn: '2', borderBottom: '1px solid lightgrey' }}>
                    <p className={activePlan === 'basic' ? 'redText' : 'greyText'}>$9.99</p>
                </div>
                <div style={{ gridRow: '2', gridColumn: '3', borderBottom: '1px solid lightgrey' }}>
                    <p className={activePlan === 'std' ? 'redText' : 'greyText'}>$15.49</p>
                </div>
                <div style={{ gridRow: '2', gridColumn: '4', borderBottom: '1px solid lightgrey' }}>
                    <p className={activePlan === 'premo' ? 'redText' : 'greyText'}>$19.99</p>
                </div>

                {/* GRID ROW 3 */}
                <div style={{ gridRow: '3', gridColumn: '1', borderBottom: '1px solid lightgrey' }}>
                    <p style={planHeader}>Video quality</p>
                </div>
                <div style={{ gridRow: '3', gridColumn: '2', borderBottom: '1px solid lightgrey' }}>
                    <p className={activePlan === 'basic' ? 'redText' : 'greyText'}>Good</p>
                </div>
                <div style={{ gridRow: '3', gridColumn: '3', borderBottom: '1px solid lightgrey' }}>
                    <p className={activePlan === 'std' ? 'redText' : 'greyText'}>Better</p>
                </div>
                <div style={{ gridRow: '3', gridColumn: '4', borderBottom: '1px solid lightgrey' }}>
                    <p className={activePlan === 'premo' ? 'redText' : 'greyText'}>Best</p>
                </div>

                {/* GRID ROW 4 */}
                <div style={{ gridRow: '4', gridColumn: '1', borderBottom: '1px solid lightgrey' }}>
                    <p style={planHeader}>Resolution</p>
                </div>
                <div style={{ gridRow: '4', gridColumn: '2', borderBottom: '1px solid lightgrey' }}>
                    <p className={activePlan === 'basic' ? 'redText' : 'greyText'}>480p</p>
                </div>
                <div style={{ gridRow: '4', gridColumn: '3', borderBottom: '1px solid lightgrey' }}>
                    <p className={activePlan === 'std' ? 'redText' : 'greyText'}>1080p</p>
                </div>
                <div style={{ gridRow: '4', gridColumn: '4', borderBottom: '1px solid lightgrey' }}>
                    <p className={activePlan === 'premo' ? 'redText' : 'greyText'}>4K+HDR</p>
                </div>

                {/* GRID ROW 5 */}
                <div style={{ gridRow: '5', gridColumn: '1' }}>
                    <p style={planHeader}>Watch on your TV, computer, mobile phone and tablet</p>
                </div>
                <div style={{ gridRow: '5', gridColumn: '2' }}>
                    <p className={activePlan === 'basic' ? 'redText' : 'greyText'}>{checkMarkSm}</p>
                </div>
                <div style={{ gridRow: '5', gridColumn: '3' }}>
                    <p className={activePlan === 'std' ? 'redText' : 'greyText'}>{checkMarkSm}</p>
                </div>
                <div style={{ gridRow: '5', gridColumn: '4' }}>
                    <p className={activePlan === 'premo' ? 'redText' : 'greyText'}>{checkMarkSm}</p>
                </div>
            </div>
        </>
    )
}

export default PlanFormAlt;