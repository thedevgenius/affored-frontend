const Loader = () => {
    return (
        <>
            <div className="LoaderContainer">
                <div className="Loader">
                    <svg className="LoaderIcon" viewBox="0 0 50 50">
                        <circle className="LoaderPath" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                    </svg>
                    <p className="LoaderText">Loading...</p>
                </div>
                
            </div>
        </>
    )
}

export default Loader;