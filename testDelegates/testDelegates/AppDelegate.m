//
//  AppDelegate.m
//  testDelegates
//
//  Created by Dom on 2/28/14.
//  Copyright (c) 2014 dolodev llc. All rights reserved.
//

#import "AppDelegate.h"

@implementation AppDelegate

// implementing exposed class of delegate
// this UIApp delegates to the custom class
//
- (void) delegatedResponse
{
    NSLog(@"Response!");
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    ClassWithDelegate *delegatedClass = [[ClassWithDelegate alloc] initWithDelegate:self];
    
    // messages to our class can trigger the delegate
    [delegatedClass messageToClass];
    
    return YES;
}

@end
