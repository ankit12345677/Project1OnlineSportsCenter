import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal } from '@material-ui/core';
import { GetOrderDetails } from '../../../../../services';
import { NotificationManager } from 'react-notifications';

// function rand() {
//     return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
    const top = 50 ;
    const left = 50 ;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function Changestatus(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [deliverydate, setDate] = React.useState()
    const [status, setStatus] = React.useState()


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDeliveryDate = event => {
        setDate(event.target.value)
    }
    const handleChangeStatus = event => {
        setStatus(event.target.value)
    }
    const handleUpdateStatus = async() => {
        let data = { status: status, id: props.state.id, deliverydate: new Date(deliverydate) }
        let update = await GetOrderDetails.getOrderStatusUpdate(data);
        if (update) {
            NotificationManager.success(update.msg, 'Status');
            window.location.href="/admin/order/list";
        } else {
            NotificationManager.error("Check Status", "Status");
        }

    }
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className="select-status">
                <label htmlFor="status">Delivery Date*</label>
                <div className="input-group">
                    <input className="custom-select" type="date" name="deliverydate" value={deliverydate} onChange={handleDeliveryDate} />
                </div>
            </div>
            <div className="select-status">
                <label htmlFor="status">Status*</label>
                <div className="input-group">
                    <select id="status" name="status" className="custom-select" defaultValue={props.state.status} onChange={handleChangeStatus}>
                        <option value="processing">Processing</option>
                        <option value="shipping">Shipping</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancel">Cancel</option>
                    </select>
                    <div className="input-group-append">
                        <button className="status-btn hover-btn" type="submit" onClick={handleUpdateStatus}>Submit</button>
                    </div>
                </div>
            </div>
        </div >
    );

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}> Status</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}