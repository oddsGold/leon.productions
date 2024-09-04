import Description from "../Description";

export default function RemainingCases({cases}) {
    return (
        <div className="row no-gutters">
            {cases.map((item, index) => {
                if (index % 3 === 0) {
                    return (
                        <div className="col-lg-12" key={index}>
                            <div
                                className="home-grid__item overlay text-white d-flex justify-content-center align-items-center">
                                <h2>{item.name}{index}</h2>
                                <Description />
                            </div>
                        </div>
                    );
                }

                return (
                    <div className="col-lg-6" key={index}>
                        <div
                            className="home-grid__item overlay text-white d-flex justify-content-center align-items-center">
                            <h2>{item.name}{index}</h2>
                            <Description />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
