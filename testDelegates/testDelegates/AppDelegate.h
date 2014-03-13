//
//  AppDelegate.h
//  testDelegates
//
//  Created by Dom on 2/28/14.
//  Copyright (c) 2014 dolodev llc. All rights reserved.
//

#import "ClassWithDelegate.h"
                                                // add that we're listening
@interface AppDelegate : UIResponder <UIApplicationDelegate,ClassWithDelegateDelegate>

@property (strong, nonatomic) UIWindow *window;

@end
