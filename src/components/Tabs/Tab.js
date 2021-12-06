import './Tab.css';

function Tab(props) {
    const classNames = ["tab-list-item"];
    if (props.activeTab === props.label) {
        classNames.push("tab-list-active");
    }
    return <li className={classNames.join(" ")}
               onClick={() => props.onClickTab(props.label)}>
        {props.label}
    </li>
}

export default Tab;


// import './Tab.css';

// export function Tab(props) {
//     const classNames = ["tab-list-item"];
    
//     if (props.activeTab === props.label) {
//         classNames.push("tab-list-active");
//     }

//     const handleKeyDown = (event) => {
//         if (event.key === ' ' || event.key === "Enter") {
//             props.onClickTab(props.label)
//         }
//     }
    
//     return (
//         <li 
//             tabIndex="0" 
//             className={classNames.join(" ")} 
//             onClick={() => props.onClickTab(props.label)}
//             onKeyDown={(handleKeyDown)}
//         >
//                 {props.label}
//         </li>
//     )
// }