import './Tab.css';

export function Tab(props) {
    const classNames = ["tab-list-item"];
    
    if (props.activeTab === props.label) {
        classNames.push("tab-list-active");
    }

    const handleKeyDown = (event) => {
        if (event.key === ' ') {
            props.onClickTab(props.label)
        }
    }
    
    return (
        <li 
            tabIndex="0" 
            className={classNames.join(" ")} 
            onClick={() => props.onClickTab(props.label)}
            onKeyDown={(handleKeyDown)}
        >
                {props.label}
        </li>
    )
}