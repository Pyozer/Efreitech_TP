const CenterContent = ({ children }) => (
    <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
            <div className="col-12 col-sm-8 col-lg-5 text-center">
                {children}
            </div>
        </div>
    </div>
)