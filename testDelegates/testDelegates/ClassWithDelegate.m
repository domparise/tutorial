//
//  Custom.m
//  testDelegates
//
//  Created by Dom on 2/28/14.
//  Copyright (c) 2014 dolodev llc. All rights reserved.
//

#import "ClassWithDelegate.h"

@implementation ClassWithDelegate

-(id)initWithDelegate:(id)delegate {
    
    self = [super init];
    self.delegate = delegate;
    return self;
    
}

-(void)messageToClass {
    // send message the message to the delegate!
    NSLog(@"Call");
    // we know we have a delegate, and that is implements
    [self.delegate delegatedResponse];
}


@end

