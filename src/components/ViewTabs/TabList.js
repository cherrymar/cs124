import {useState} from 'react'
import {Tab} from "./Tab";

function TabList(props) {
    const [activeTab, setActiveTab] = useState("All");
    return (
        
        <div className="tabs">
            <ol className="tab-list">
                {
                    props.children.map((child) => 
                        <Tab key={child.key}
                        label={child.key}
                        activeTab={activeTab}
                        onClickTab={() => setActiveTab(child.key)}/>
                    )
                }
            </ol>
            {
                
                props.children.map((child) => 
                    activeTab === child.key && child
                )
            }
        </div>
    );
}

export default TabList;
