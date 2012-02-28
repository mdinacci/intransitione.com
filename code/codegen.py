#!/usr/bin/env python 
# -*- coding: utf-8 -*-

"""
This utility creates a stub of code for the language passed as argument  
MD
"""

# some globals
AUTHOR  = "Marco Dinacci <dev@dinointeractive.com>"
LICENSE = "BSD"


class PythonStubGenerator(object):
	def generate(self,outputFileName):
		return \
		"""#!/usr/bin/env python
# -*- coding: utf-8-*-

	
"\"\"
Filename: %s
Author: %s
License: %s

This module...
\"\"\"
		
if __name__ == '__main__':
	print "Hello!"

		""" % (outputFileName, AUTHOR, LICENSE)

class JavaStubGenerator(object):
	def generate(self,outputFileName):
		return \
		"""/*
Filename: %s
Author: %s
License: %s
*/

/**
* %s
* This class ...
*/
public class Pippo {
	public static void p(String s) {
		System.out.println(s);
	}
	public static void main(String[] args) {
		p("Hello!");	
	}
}
		""" % (outputFileName, AUTHOR, LICENSE, outputFileName[:-5])

class ObjcStubGenerator(object):
	def generate(self,outputFileName):
		return """// Filename: %s
// Author: %s
// License: %s

#include <Foundation/Foundation.h>

int main(int argc, char *argv[]) {
	NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];

	NSLog(@"Hello!");

	[pool release];

	return 0;
}
		""" % (outputFileName, AUTHOR, LICENSE)

class CStubGenerator(object):
	def generate(self,outputFileName):
		return """// Filename: %s
// Author: %s
// License: %s

#include <stdio.h>

int main(int argc, char *argv[]) {
	printf("Hello!");

	return 0;
}
		""" % (outputFileName, AUTHOR, LICENSE)

class CppStubGenerator(object):
	def generate(self,outputFileName):
		return """// Filename: %s
// Author: %s
// License: %s

#include <iostream>

int main(int argc, char *argv[]) {
	std::cout << "Hello!";

	return 0;
}
		""" % (outputFileName, AUTHOR, LICENSE)

class HTMLStubGenerator(object):
	def generate(self,outputFileName):
		pass

def usage():
	print "Usage: codegen -l <language> -o <output>"
	print "Supported languages: python, java, c, cpp, objc"


def checkParams(params):
	return len(params) < 4 or params[0] != '-l' or params[3] != '-o' \
	or params[1] not in translationTable.keys()

translationTable = {'python':PythonStubGenerator,\
					'java': JavaStubGenerator,\
					'objc':ObjcStubGenerator,\
					'c':CStubGenerator,\
					'html':HTMLStubGenerator,\
					'cpp':CppStubGenerator}

if __name__ == '__main__':
	import sys

	params = sys.argv[1:]
	if not checkParams(params): usage()
	
	language = params[1]
	outputFile = params[3]
	
	stubGenerator = translationTable[language]()
	
	f = open(outputFile,'w')
	f.write(stubGenerator.generate(outputFile))
