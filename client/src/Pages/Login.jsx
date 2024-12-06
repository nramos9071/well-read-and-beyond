import { Link } from 'react-router-dom';


const Login = (props) => {
    const [formState , setFormState] = useState ({ email:'', password});
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { ...formState },
            });
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <main>
            <div>
                <h3>Login</h3>
            </div>
            <form>
                <label id="username">UserName:</label>
                <input name="username" type="text" id="username"></input>
                <label id="password">Password:</label>
                <input name="password" type="password" id="password"></input>
                    
            </form>
        </main>
    )
};