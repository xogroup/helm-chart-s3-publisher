#!/usr/bin/env bash

TEST_MODE=test
RUN_MODE=run
MODE=$RUNMODE

#parse argument list
while [[ $# > 0 ]]
do
	ARG=$1

	case $ARG in
	-r|--run) MODE=$RUN_MODE ;;
	esac

	shift
done

#set pwd
cd /opt/app/current

#echo out environment variables we care about
echo APPLICATION_VARIABLES
echo NODE_ENV=$NODE_ENV

#execution based on argument
if [ $MODE == $RUN_MODE ]; then
	echo RUNNING SERVICE
	node src/service.js
fi