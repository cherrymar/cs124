import React, {useState} from 'react'
import { connect } from 'react-redux'


import * as actions from '../../../backend/store/actions'
import Tab from "./Tab";





// const filterByOptions = ["All", "Dont", "In Progress"]

const TabList = ({ sortView, listId, initialFilterView, setFilterByView, children }) => {
    console.log("initial filter by: ", initialFilterView)
    const [activeTab, setActiveTab] = useState(initialFilterView);

    function onTabChange(tab) {
        console.log("new filter by: ", tab)
        setFilterByView({filterView: tab, sortView: sortView, listId: listId});
        setActiveTab(tab)
    }

    return (
        <div className="tabs">
            <ol className="tab-list">
                {
                    children.map((child) => 
                        <Tab 
                            key={child.key}
                            label={child.key}
                            activeTab={activeTab}
                            onClickTab={() => onTabChange(child.key)}
                        />
                    )
                }
            </ol>
            {children.map((child) => activeTab === child.key && child)}
        </div>
    );
}


const mapStateToProps = ({ firebase, app }) => ({
    initialFilterView: app.filterView,
    sortView: app.sortView,
    listId: app.listId,
})

const mapDispatchToProps = {
    setFilterByView: actions.setFilterByView,
}

export default connect(mapStateToProps, mapDispatchToProps)(TabList)

