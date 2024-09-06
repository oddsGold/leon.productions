import Talk from "./Talk";
import Description from "../Description";

export default function TopCases({ cases, handleShowModal }) {
    return (
        <>
            {cases.length > 0 && (
                <div className="home-grid__item home-grid__item--first d-flex flex-column justify-content-center align-items-center">
                    <h1>{cases[0].name}</h1>
                    <p>Этот блок самый большой</p>
                    <Description />
                </div>
            )}

            <div className="row no-gutters">
                {cases.slice(1).map((item, index) => (
                    <div key={index} className="col-lg-6">
                        <div className={`home-grid__item block text-white d-flex justify-content-center align-items-center`}>
                            <h2>{item.name}</h2>
                            <Description />
                        </div>
                    </div>
                ))}

                <div className="col-lg-6">
                    <div className="home-grid__item">
                        <Talk handleShowModal={handleShowModal} />
                    </div>
                </div>
            </div>
        </>
    );
}
