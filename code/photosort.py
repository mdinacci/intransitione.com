#!/usr/bin/env python
# -*- coding: utf-8-*-

	
"""
Filename: photosort.py
Author: Marco Dinacci <dev@dinointeractive.com>
License: BSD
Requirements: EXIF.py (http://exif-py.sourceforge.net/)
Description: This module take as input a folder and rearrange the images found
			 in folders according to their EXIF date.

"""

import EXIF
import sys
import os
from shutil import move

def isPhoto(photo):
	isPhoto = False
	
	def hasExifTags(photo):
	   f = open(photo, "rb")
	   data = f.read(12)
	   # if file format is TIFF or JPEG we have a photo
	   return data[0:4] in ['II*\x00', 'MM\x00*'] or data[0:2] == '\xFF\xD8'
	
	if os.path.exists(photo) and os.path.isfile(photo) and hasExifTags(photo):
	   	isPhoto = True
	
	return isPhoto
	
	
def sortPhotosInFolder(folder):
	def sortPhoto(photoPath):
		key = "EXIF DateTimeOriginal"
		tags = EXIF.process_file(open(photoPath,'rb'), stop_tag=key, 
								 details=False, strict=True)
		if tags.has_key(key):
			# extract date (example: "2005:03:14 19:35:52")
			date = tags[key].printable.split(" ")[0].split(":")
			
			# I'm sure there must be a more pythonic way to code this...
			year = os.path.join(folder, date[0])
			month = os.path.join(year, date[1])
			day = os.path.join(month, date[2])
			if not os.path.exists(year) or (os.path.exists(year) and not os.path.isdir(year)):
				os.mkdir(year)
			if not os.path.exists(month)  or (os.path.exists(year) and not os.path.isdir(year)):
				os.mkdir(month)
			if not os.path.exists(day)  or (os.path.exists(day) and not os.path.isdir(day)):
				os.mkdir(day)
			
			# move picture from the original location to the directory in year/month/day
			move(photoPath, day)
				
		else:
			print "Photo %s doesn't have the %s tag, skipping..." % (photo,key)
		

	if os.path.exists(folder):
		for photo in os.listdir(folder):
			photoPath = os.path.join(folder,photo)
			print "Processing photo: ", photoPath
			if isPhoto(photoPath):
				sortPhoto(photoPath)
			else:
				print "File %s is not a valid photo, skipping..." % photoPath
	else:
		quit("Folder %s does not exists")
		

def quit(msg = ""):
	print msg
	sys.exit(1)

if __name__ == '__main__':
	
	if len(sys.argv) > 1:
		sortPhotosInFolder(sys.argv[1])
