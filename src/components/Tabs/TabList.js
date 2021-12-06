import React, {useState} from 'react';
import Tab from './Tab.js'

function TabList(props) {
    const [activeTab, setActiveTab] = useState(props.children[0].key);
    return (
        <div className="tabs">
            <ol className="tab-list">
                {props.children.map(child =>
                <Tab key={child.key}
                     label={child.key}
                     activeTab={activeTab}
                     onClickTab={(label) => setActiveTab(label)}/>)}
            </ol>
            {props.children.find((child) => child.key === activeTab)}
        </div>
    );
}

export default TabList;


// import {useState} from 'react'
// import {Tab} from "./Tab";

// function TabList(props) {
//     const [activeTab, setActiveTab] = useState("All");

//     function onTabChange(tab) {
//         props.onTabChange(tab)
//         setActiveTab(tab)
//     }

//     return (
//         <div className="tabs">
//             <ol className="tab-list">
//                 {
//                     props.children.map((child) => 
//                         <Tab 
//                         key={child.key}
//                         label={child.key}
//                         activeTab={activeTab}
//                         onClickTab={() => onTabChange(child.key)}/>
//                     )
//                 }
//             </ol>
//             {props.children.map((child) => activeTab === child.key && child)}
//         </div>
//     );
// }

// export default TabList;
