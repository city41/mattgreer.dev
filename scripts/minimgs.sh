#!/bin/bash

for SVG in $(ls ./public/*.svg)
do
  yarn svgo $SVG
done
