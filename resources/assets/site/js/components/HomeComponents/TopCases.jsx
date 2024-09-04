import Talk from "./Talk";

export default function TopCases({ cases }) {
    return (
        <>
            {cases.length > 0 && (
                <div className="home-grid__item home-grid__item--first vh-90 bg-primary d-flex flex-column justify-content-center align-items-center">
                    <h1>{cases[0].name}</h1>
                    <p>Этот блок самый большой</p>
                </div>
            )}

            <div className="row no-gutters">
                {cases.slice(1).map((item, index) => (
                    <div key={index} className="col-lg-6">
                        <div className={`home-grid__item block text-white d-flex justify-content-center align-items-center`}>
                            <h2>{item.name}</h2>
                        </div>
                    </div>
                ))}

                <div className="col-lg-6">
                    <div className="home-grid__item">
                        <Talk />
                    </div>
                </div>
            </div>
        </>
    );
}
