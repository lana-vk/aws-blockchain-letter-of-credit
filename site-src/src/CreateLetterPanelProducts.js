import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import {Tooltip} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import util from 'util';

export default function AddProducts(props) {
  //var values=props.values;

  return (
<div>     
<FieldArray
    name='product'
    render={arrayHelpers => ( 
        <React.Fragment>
        {props.values.product.map((product, index) => (          
        <div key={index} >
    
            <Field
                name={`product.${index}`} 
                render={({ field /* _form */ }) => (
                    <React.Fragment>
                  <TextField
                    {...field}
                    label={`Product Name`}
                    name={`product.${index}.name`}
                    className={props.classes.textField}
                    value={product.name}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={(props.errors[`product.${index}.quantity`] && props.touched[`product.${index}.quantity`]) && props.errors[`product.${index}.quantity`]}
                    margin="normal"
                  />

                  <TextField
                    {...field}
                    label={`Product Quantity`}
                    name={`product.${index}.quantity`}
                    className={props.classes.textField}
                    value={product.quantity}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={(props.errors[`product.${index}.quantity`] && props.touched[`product.${index}.quantity`]) && props.errors[`product.${index}.quantity`]}
                    margin="normal"
                  />
                  </React.Fragment>
                )}
            />
            <Tooltip title="Remove this product">
            <button 
                type="button"
                style={{verticalAlign:"bottom", margin:"15px"}}
                onClick={() => arrayHelpers.remove(index)}
                >
                Remove
            </button>   
            </Tooltip>
        </div>
    ))}
<Tooltip title="Add a product">
    <button 
        type="button"
        style={{verticalAlign:"bottom", margin:"15px"}}
        onClick={() => arrayHelpers.push('')}
        >
        Add Product
    </button>
    </Tooltip>
    </React.Fragment>
)} />
</div>
  )}