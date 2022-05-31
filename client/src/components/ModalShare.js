import React, { useEffect, useState} from 'react';
import '../styles/modal.css';
import SharedSection from './SharedSection';
import ShareHistory from './ShareHistory';
import ModalLoading from './ModalLoading';
import ShareSearch from './ShareSearch';

const ModalShare = ({toggle, listData}) => {

    const [ activeTab, setActiveTab ] = useState('tab1');
    const [ sharedIds, setSharedIds ] = useState([]);
    const [ loadingModal, setLoadingModal ] = useState(false);
    const [ appThinking, setAppThinking ] = useState(false);
    
    useEffect(() => {
        let ids = [];
        
        if(listData.list.sharedWith) {
            ids = listData.list.sharedWith.map((user, index) => {
            return user._id
            })
        } else { ids = []; }

        setSharedIds(ids);
    }, []);

    const handleChangeTab = (event, tabId) => {
        event.preventDefault();
        setActiveTab(tabId)
    }

    const setModalRemote = (value) => {
        setLoadingModal(value)
    }
  
    return (
            <div className="modal-outer" id="modal-wrapper">
                <section className='modal'>
                    {loadingModal && <ModalLoading text="Please wait..." />}
                    <h4 className="modal-h4">Share List</h4>
                    <ul className='share-tab-container'>
                        <li className='share-tab' id="tab1" key="tab1" onClick={event => handleChangeTab(event, event.target.id)}>Shared</li>
                        <li className='share-tab' id="tab2" key="tab2" onClick={event => handleChangeTab(event, event.target.id)}>History</li>
                        <li className='share-tab' id="tab3" key="tab3" onClick={event => handleChangeTab(event, event.target.id)}>Search</li>
                    </ul>
                    {activeTab === 'tab1' && 
                        <div>
                            <SharedSection data={listData} />
                        </div>}
                    {activeTab === 'tab2' && 
                        <div>
                            <p className='list-shared-p'>Your recent Shared History</p>    
                            <ShareHistory listData={listData} sharedIds={sharedIds} setSharedIds={setSharedIds} loadingModalState={loadingModal} setLoadingModal={setModalRemote}/>
                        </div>}
                    {activeTab === 'tab3' && 
                        <div>
                            <ShareSearch listData={listData} sharedIds={sharedIds} setSharedIds={setSharedIds} />
                        </div>}
                    <button className="btn-list-action" disabled={appThinking} onClick={toggle}>Return</button>
                </section>
            </div>
        )
}

export default ModalShare;