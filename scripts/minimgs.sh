#!/bin/bash

for SVG in $(ls ./**/*.svg)
do
  yarn svgo $SVG
done

