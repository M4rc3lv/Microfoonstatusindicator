#!/bin/bash
Status=`amixer -D pulse sset Capture toggle | grep '\[on\]'`
echo $Status
if [ "$Status" ]
then
 amixer -D pulse sset Capture toggle 
fi
