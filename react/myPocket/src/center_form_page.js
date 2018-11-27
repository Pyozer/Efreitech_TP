const CenterFormPage = ({title, error, children}) => (
    <main className="col-md-9 ml-sm-auto col-lg-10 p-5">
        <CenterContent>
            <h1 className="h1 mb-5">{title}</h1>

            {error ? <p className="text-danger mb-4"><strong>{error}</strong></p> : null}

            {children}
        </CenterContent>
    </main>
)