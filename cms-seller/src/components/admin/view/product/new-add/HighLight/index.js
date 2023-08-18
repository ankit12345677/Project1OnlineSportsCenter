import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import DeleteForever from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
const HighLightList = ({callback}) => {
    const [inputList, setInputList] = useState([{
        title: null,
    }]);
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
        callback(list)
    };
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        callback(list)
    };
    const handleAddClick = (event) => {
        setInputList([...inputList, {
            title: null,
        }]);
    };
    return (
        <React.Fragment>
            {inputList.map((x, i) => {
                return (
                    <Grid container spacing={2} style={i % 2 ? { marginTop: '1rem', background: 'rgb(195 232 191 / 25%)' } : { background: '#DAF7A6' }}>
                        <Grid item md={4} lg={4}>
                            <input
                                className="form-control"
                                name="title"
                                placeholder="ex: Durability + Comfort+ Lightweight"
                                value={x.title}
                                onChange={e => handleInputChange(e, i)}
                            />
                        </Grid>
                        <Grid item md={4} lg={4}>
                        <div className="btn-box">
                                {inputList.length !== 1 && <Button
                                    variant="contained"
                                    className="text-danger"
                                    onClick={() => handleRemoveClick(i)} style={{ marginRight: '1rem' }}><DeleteForever/></Button>}
                                {inputList.length - 1 === i && <Button variant="contained" onClick={(e)=>handleAddClick(e)}><AddIcon/></Button>}
                            </div>
                        </Grid>
                      
                    </Grid>
                );
            })}

        </React.Fragment>
    )
}

export default HighLightList