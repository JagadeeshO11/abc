
export default function AboutUs() {
    return (
        <div className="container section-gap">
            <div className="section-header">
                <div className="badge-mint" style={{ marginBottom: '16px' }}>WHO WE ARE</div>
                <h1 className="display-lg">ITBEES GLOBAL PVT. LTD.</h1>
                <p className="section-subtitle">Delivering robust ERP solutions, customized business intelligence tools, and training pipelines.</p>
            </div>

            <div className="card-floating" style={{ marginBottom: '64px' }}>
                <h2 className="display-md" style={{ marginBottom: '16px', textAlign: 'left' }}>COMPANY OVERVIEW</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--color-ink)', marginBottom: '24px' }}>
                    Established in Hyderabad's premier IT hub Gachibowli, ITBEES GLOBAL PVT. LTD. is an enterprise solutions partner designed to solve technical complexity. We specialize in configuring unified databases, deploying scalable smart cloud architectures, and preparing data automation workflows that drive corporate performance.
                </p>
                <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--color-ink)' }}>
                    Whether it is staffing specialized frontend engineering teams, deploying analytics modules, or upgrading student knowledge through corporate training catalogs, ITBEES Global focuses on providing clear results and absolute data security.
                </p>
            </div>

            <div className="grid-3" style={{ marginBottom: '64px' }}>
                <div className="card-neutral">
                    <h3 className="heading-lg" style={{ color: 'var(--color-corporate-blue)', marginBottom: '16px' }}>OUR VISION</h3>
                    <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        To become the leading global architecture and data systems provider, delivering reliable analytics and ERP tools that help businesses and learners scale effortlessly.
                    </p>
                </div>

                <div className="card-neutral">
                    <h3 className="heading-lg" style={{ color: 'var(--color-evergreen-glow)', marginBottom: '16px' }}>OUR MISSION</h3>
                    <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        To simplify database migration, deliver precise BI visualizations, and establish structured training platforms that cultivate modern coding standards and security habits.
                    </p>
                </div>

                <div className="card-neutral">
                    <h3 className="heading-lg" style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>CORE VALUES</h3>
                    <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        Integrity, technical expertise, visual clarity in reports, automated efficiency, and a commitment to helping our engineering talent excel globally.
                    </p>
                </div>
            </div>
        </div>
    );
}
