import React, { memo } from "react";
import { Text, Pressable,StyleSheet, } from "react-native";

const FilterComponent = (props) => {
  const { filterDay, filterText, selectedRange, setSelectedRange } = props;
  const isFilterSelected = (filter) => filter === selectedRange;

  return (
    <Pressable
      style={{
        width:49,
        height:49,
        borderRadius: 49,
        backgroundColor:isFilterSelected(filterDay)?'rgb(240,240,240)':'#fff',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      }}
      onPress={() => setSelectedRange(filterDay)}
    >
      <Text style={{...styles.text,color:isFilterSelected(filterDay)?'#1652f0':'rgb(100,100,100)',}}>{filterText}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text:{
    color:'rgb(100,100,100)',
    fontSize:17,
    fontFamily:'ABeeZee'
  }
 

})

export default memo(FilterComponent);