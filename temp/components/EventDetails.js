import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { fetchEvent } from '../actions/events';

class EventDetails extends PureComponent{
    state = { edit: false }

    componentWillMount(props) {
        this.props.fetchEvent(this.props.match.params.id)
    }

    render() {
        const { event } = this.props
        if (!event) return null

        return (
            <div>                
                {                   
                    <div>                        
                        <h3>{ event.name }</h3>
                        <p>{ event.description }</p>
                        { !event.picture && 'There is no picture'}
                        { event.picture && event.picture.map (url =>
                        <img src = { url } alt="event picture"/>)}
                        <p>{ event.date }</p>

                        <p>{ event.tickets }</p>
                        
                    </div>
                }                
            </div>       
        )
    }

}

const mapStateToProps = function (state, props) {
    return {
        event: state.event
    }
}

export default connect(mapStateToProps, {
    fetchEvent
})(EventDetails)