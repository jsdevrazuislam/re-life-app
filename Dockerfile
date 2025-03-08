# Use Node.js with Debian as the base image
FROM node:18-bullseye

# Install Java (Required for Android SDK)
RUN apt-get update && apt-get install -y openjdk-11-jdk unzip wget && rm -rf /var/lib/apt/lists/*

# Set Java Home Environment Variable
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH=$JAVA_HOME/bin:$PATH

# Set Android SDK Environment Variables
ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV PATH="$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/emulator:$PATH"

# Create SDK directory
RUN mkdir -p $ANDROID_SDK_ROOT/cmdline-tools

# Download & Install Android SDK Command Line Tools
RUN cd $ANDROID_SDK_ROOT && \
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip -O android-sdk.zip && \
    unzip android-sdk.zip -d $ANDROID_SDK_ROOT/cmdline-tools && \
    mv $ANDROID_SDK_ROOT/cmdline-tools/cmdline-tools $ANDROID_SDK_ROOT/cmdline-tools/latest && \
    rm android-sdk.zip

# Accept all licenses manually
RUN yes | sdkmanager --licenses || true

# **Force update SDK repository**
RUN sdkmanager --update || true

# **Install required SDK components (Skip emulator for now)**
RUN sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.2" || true

# Set working directory
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependencies and install them
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy project files
COPY . .

# Expose necessary ports
EXPOSE 8081 5555

# Start Metro Bundler
CMD ["pnpm", "start"]
