import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
const HighLightList = ({callback, state}) => {
    const [inputList, setInputList] = useState(state.length > 0 ? state.map(item => ({ ...item, readonly: true })) : [{ tite: null}]);
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
        callback(list)
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
                                placeholder="ex: 50MP + 2MP + AI Lens | 8MP Front Camera"
                                value={x.title}
                                disabled
                                onChange={e => handleInputChange(e, i)}
                            />
                        </Grid>
                    </Grid>
                );
            })}

        </React.Fragment>
    )
}

export default HighLightList