import {useState} from 'react'
import {Tab} from "./Tab";

function TabList(props) {
    const [activeTab, setActiveTab] = useState("All");

    function onTabChange(tab) {
        props.onTabChange(tab)
        setActiveTab(tab)
    }

    return (
        <div className="tabs">
            <ol className="tab-list">
                {
                    props.children.map((child) => 
                        <Tab key={child.key}
                        label={child.key}
                        activeTab={activeTab}
                        onClickTab={() => onTabChange(child.key)}/>
                    )
                }
            </ol>
            {props.children.map((child) => activeTab === child.key && child)}
        </div>
    );
}

export default TabList;
