const RoundedInput = ({ type = 'text', name, placeholder, required = false }) => (
    <div className="form-group">
        <input 
            type={type}
            className="form-control is-rounded" 
            name={name}
            placeholder={placeholder}
            required={required ? true : false} />
    </div>
)