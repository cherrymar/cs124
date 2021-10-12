import App from "./App"



function InMemoryApp(props) {
    return <App initialData={props.initialData}/>
}

export default InMemoryApp;