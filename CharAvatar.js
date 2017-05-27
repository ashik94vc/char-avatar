/**
 * Created by ashikvc on 26/05/17.
 */
import React, { Component } from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

import colors from './colors.json';
import styles from './styles';

export default class CharAvatar extends Component {

    constructor(props) {
        super(props);
        this.singleChar = props.singleChar;

        let words = this.props.text.split(" ");

        if(words.length < 2)
            this.singleChar = true;
    }

    getRandomColor() {
        if(this.props.backgroundColor)
            return this.props.backgroundColor;
        let matColors = colors["mdcolor_"+this.props.swatchStyle];
        if(!matColors)
            matColors = colors["mdcolor_500"];
        return matColors[Math.floor(Math.random()*matColors.length)].hexColor;

    }

    getInitials() {
        let {text, defaultInitial} = this.props;

        if(defaultInitial.length > 2)
            defaultInitial = "A";

        let words = text.split(" ");

        if(text) {
            if (this.singleChar)
                return words[0].charAt(0).toUpperCase();
            else
                return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
        }
        else
            return defaultInitial
    }

    render() {
       return (
           <View style={[styles.icon, {
               height: this.props.size,
               width: this.props.size,
               borderRadius: this.props.size/2,
               backgroundColor: this.getRandomColor() }]}>
               <Text style={[styles.text, {fontSize: this.singleChar?this.props.size/1.7:this.props.size/2.56}]}>
                   {this.getInitials()}
               </Text>
           </View>
       )
    }

}

CharAvatar.propTypes = {
    swatchStyle: PropTypes.string,
    singleChar: PropTypes.bool,
    text: PropTypes.string.isRequired,
    defaultInitial: PropTypes.string,
    backgroundColor: PropTypes.string,
    size: PropTypes.number.isRequired,
};

CharAvatar.defaultProps = {
    swatchStyle: '500',
    singleChar: false,
    defaultInitial: 'A',
};