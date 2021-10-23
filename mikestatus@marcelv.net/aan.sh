#!/bin/bash
Status=`amixer -D pulse sset Capture toggle | grep '\[off\]'`
echo $Status
if [ "$Status" ]
then
 amixer -D pulse sset Capture toggle 
fi
